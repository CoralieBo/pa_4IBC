// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Test, console2} from "forge-std/Test.sol";
import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {PouFactory} from "../src/Factory.sol";
import {PouPools} from "../src/Pools.sol";

contract TokenA is ERC20 {
    constructor() ERC20("TokenA", "TKA") {
        _mint(msg.sender, 3000 ether);
    }
}

contract TokenB is ERC20 {
    constructor() ERC20("TokenB", "TKB") {
        _mint(msg.sender, 5000 ether);
    }
}

contract PouFactoryTest is Test {
    PouFactory public factory;
    ERC20 public tokenA;
    ERC20 public tokenB;

    function setUp() public {
        tokenA = new TokenA();
        tokenB = new TokenB();
        factory = new PouFactory();
    }

    function test_CreatePool() public {
        tokenA.approve(address(factory), 1000 ether);
        tokenB.approve(address(factory), 2000 ether);

        factory.createPool(address(tokenA), address(tokenB), 1000 ether, 2000 ether);

        (address[] memory pairs, PouFactory.InfosPool[] memory infos) = factory.getPairsAddresses();
        assertEq(pairs.length, 1);
        assertEq(address(infos[0].tokenA), address(tokenA));
        assertEq(address(infos[0].tokenB), address(tokenB));
    }

    function test_SetAndGetFees() public {
        uint256 initialFee = factory.getFees();
        assertEq(initialFee, 10); // 0.1%

        factory.setFees(50); // 0.5%
        uint256 newFee = factory.getFees();
        assertEq(newFee, 50);
    }

    function test_GetTokensAmountToClaim() public {
        tokenA.approve(address(factory), 1000 ether);
        tokenB.approve(address(factory), 2000 ether);
        factory.createPool(address(tokenA), address(tokenB), 1000 ether, 2000 ether);

        (uint256[] memory amounts, ERC20[] memory tokens) = factory.getTokensAmountToClaim();
        assertEq(amounts.length, 2);
        assertEq(amounts[0], 0);
        assertEq(amounts[1], 0);
    }

    function test_ClosePool() public {
        tokenA.approve(address(factory), 1000 ether);
        tokenB.approve(address(factory), 2000 ether);

        factory.createPool(address(tokenA), address(tokenB), 1000 ether, 2000 ether);
        (address[] memory pairs, ) = factory.getPairsAddresses();
        assertEq(pairs.length, 1);

        factory.closePool(pairs[0]);

        (address[] memory newPairs, ) = factory.getPairsAddresses();
        assertEq(newPairs.length, 0);
    }
}
