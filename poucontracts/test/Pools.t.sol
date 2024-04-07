// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {PouPools} from "../src/Pools.sol";
import {PouFactory} from "../src/Factory.sol";

contract TokenA is ERC20 {
    constructor() ERC20("TokenA", "TKA") {
        _mint(msg.sender, 3000);
    }
}

contract TokenB is ERC20 {
    constructor() ERC20("TokenA", "TKA") {
        _mint(msg.sender, 5000);
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
        factory = new PouFactory();

        pouPools = new PouPools(tokenA, tokenB, address(factory));
        tokenA.approve(address(pouPools), 1000);
        tokenB.approve(address(pouPools), 2000);
        pouPools.initPool(1000, 2000);
        assertEq(tokenA.balanceOf(address(pouPools)), 1000);
        assertEq(tokenB.balanceOf(address(pouPools)), 2000);
        assertEq(pouPools.k(), 2000000);
    }

    function test_AddLiquidity() public {
        tokenA.approve(address(pouPools), 1000);
        tokenB.approve(address(pouPools), 2000);
        pouPools.addLiquidity(1000, 2000);
        assertEq(tokenA.balanceOf(address(pouPools)), 2000);
        assertEq(tokenB.balanceOf(address(pouPools)), 4000);
    }

    function test_GetRateAforB() public {
        assertEq(pouPools.getRateAforB(), 2 * 10 ** tokenA.decimals());
    }

    function test_GetRateBforA() public {
        assertEq(pouPools.getRateBforA(), (5 * 10 ** tokenB.decimals()) / 10);
    }

    function test_SwapAforB() public {
        uint256 initialTokenA = tokenA.balanceOf(address(pouPools));
        uint256 initialTokenB = tokenB.balanceOf(address(pouPools));
        
        uint256 amountB = pouPools.getExactTokenB(50);
        tokenA.approve(address(pouPools), 1000);
        pouPools.swapAforB(50);
        assertEq(tokenA.balanceOf(address(pouPools)), initialTokenA + 50);
        assertEq(tokenB.balanceOf(address(pouPools)), initialTokenB - amountB);
    }

    function test_SwapBforA() public {
        uint256 initialTokenA = tokenA.balanceOf(address(pouPools));
        uint256 initialTokenB = tokenB.balanceOf(address(pouPools));
        
        uint256 amountA = pouPools.getExactTokenA(50);
        tokenB.approve(address(pouPools), 1000);
        pouPools.swapBforA(50);
        assertEq(tokenA.balanceOf(address(pouPools)), initialTokenA - amountA);
        assertEq(tokenB.balanceOf(address(pouPools)), initialTokenB + 50);
    }
}
