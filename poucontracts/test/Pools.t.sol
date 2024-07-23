// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {PouPools} from "../src/Pools.sol";
import {PouFactory} from "../src/Factory.sol";

contract TokenA is ERC20 {
    constructor() ERC20("TokenA", "TKA") {
        _mint(msg.sender, 3000 ether);
    }
}

contract TokenB is ERC20 {
    constructor() ERC20("TokenA", "TKA") {
        _mint(msg.sender, 5000 ether);
    }
}

contract PouPoolsTest is Test {
    PouPools public pouPools;
    ERC20 public tokenA;
    ERC20 public tokenB;
    PouFactory public factory;

    function setUp() public {
        tokenA = new TokenA();
        tokenB = new TokenB();
        factory = new PouFactory(address(this));

        pouPools = new PouPools(tokenA, tokenB, address(factory), 1000 ether, 2000 ether, address(this));
        tokenA.transfer(address(pouPools), 1000 ether);
        tokenB.transfer(address(pouPools), 2000 ether);
        assertEq(tokenA.balanceOf(address(pouPools)), 1000 ether);
        assertEq(tokenB.balanceOf(address(pouPools)), 2000 ether);
        assertEq(pouPools.k(), 2000000 ether);
    }

    function test_AddLiquidity() public {
        tokenA.approve(address(pouPools), 1000 ether);
        tokenB.approve(address(pouPools), 2000 ether);
        pouPools.addLiquidity(1000 ether, 2000 ether);
        assertEq(tokenA.balanceOf(address(pouPools)), 2000 ether);
        assertEq(tokenB.balanceOf(address(pouPools)), 4000 ether);
    }

    function test_GetRateAforB() public {
        assertEq(pouPools.getRateAforB(), 2 * 10 ** tokenA.decimals());
    }

    function test_GetRateBforA() public {
        assertEq(pouPools.getRateBforA(), (5 * 10 ** tokenB.decimals()) / 10);
    }

    function test_SwapAforB() public {
        uint256 initialTokenA = tokenA.balanceOf(address(pouPools));
        
        tokenA.approve(address(pouPools), 1000);
        pouPools.swap(50, address(tokenA));
        assertEq(tokenA.balanceOf(address(pouPools)), initialTokenA + 50);
    }

    function test_SwapBforA() public {
        uint256 initialTokenB = tokenB.balanceOf(address(pouPools));
        
        tokenB.approve(address(pouPools), 1000);
        pouPools.swap(50, address(tokenB));
        assertEq(tokenB.balanceOf(address(pouPools)), initialTokenB + 50);
    }

    function test_RemoveLiquidity() public {
        tokenA.approve(address(pouPools), 1000 ether);
        tokenB.approve(address(pouPools), 2000 ether);
        pouPools.addLiquidity(1000 ether, 2000 ether);

        pouPools.removeLiquidity(500 ether, 1000 ether);
        assertEq(tokenA.balanceOf(address(this)), 500 ether + 1000 ether);
        assertEq(tokenB.balanceOf(address(this)), 1000 ether + 1000 ether);
        assertEq(tokenA.balanceOf(address(pouPools)), 1500 ether);
        assertEq(tokenB.balanceOf(address(pouPools)), 3000 ether);

        pouPools.removeLiquidity(500 ether, 1000 ether);
        assertEq(tokenA.balanceOf(address(this)), 500 ether + 1500 ether);
        assertEq(tokenB.balanceOf(address(this)), 1000 ether + 2000 ether);
        assertEq(tokenA.balanceOf(address(pouPools)), 1000 ether);
        assertEq(tokenB.balanceOf(address(pouPools)), 2000 ether);
    }

    function test_DistributeFeesToLiquidityProviders() public {
        tokenA.approve(address(pouPools), 1000 ether);
        tokenB.approve(address(pouPools), 2000 ether);
        pouPools.addLiquidity(1000 ether, 2000 ether);

        tokenA.approve(address(pouPools), 100 ether);
        pouPools.swap(100 ether, address(tokenA));

        uint256 totalFeesBefore = pouPools.totalFeesB();
        assert(totalFeesBefore > 0);
    }

    function test_ClaimFees() public {
        tokenA.approve(address(pouPools), 1000 ether);
        tokenB.approve(address(pouPools), 2000 ether);
        pouPools.addLiquidity(1000 ether, 2000 ether);

        tokenA.approve(address(pouPools), 100 ether);
        pouPools.swap(100 ether, address(tokenA));

        uint256 initialBalanceB = tokenB.balanceOf(address(this));
        pouPools.claim();

        uint256 finalBalanceB = tokenB.balanceOf(address(this));
        assert(finalBalanceB > initialBalanceB);
    }

    function test_ClosePool() public {
        // Only factory can close the pool
        vm.prank(address(factory));
        pouPools.closePool();
        assert(pouPools.getStatus());

        // Ensure no one can add liquidity to a closed pool
        tokenA.approve(address(pouPools), 1000 ether);
        tokenB.approve(address(pouPools), 2000 ether);
        vm.expectRevert("Pool is closed");
        pouPools.addLiquidity(1000 ether, 2000 ether);
    }

    function test_GetExactToken() public {
        uint256 amountFrom = 100 ether;
        uint256 expectedAmountB = pouPools.getExactToken(amountFrom, address(tokenA));
        assertEq(expectedAmountB, (2000 ether * amountFrom) / 1000 ether, "Expected amount of tokenB");

        uint256 expectedAmountA = pouPools.getExactToken(amountFrom, address(tokenB));
        assertEq(expectedAmountA, (1000 ether * amountFrom) / 2000 ether, "Expected amount of tokenA");
    }
}
