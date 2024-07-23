// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import {PouStaking} from "../src/Staking.sol";

contract PouStakingTest is Test {
    PouStaking public pouStaking;
    address public user1 = address(0x1);
    address public user2 = address(0x2);

    function setUp() public {
        pouStaking = new PouStaking();
    }

    function test_Stake() public {
        vm.deal(user1, 1 ether);
        vm.prank(user1);
        pouStaking.stake{value: 1 ether}();
        
        assertEq(pouStaking.balanceOf(user1), 1 ether);
        assertEq(pouStaking.totalSupply(), 1 ether);
    }

    function test_Unstake() public {
        vm.deal(user1, 1 ether);
        vm.prank(user1);
        pouStaking.stake{value: 1 ether}();
        
        vm.prank(user1);
        pouStaking.unstake(0.5 ether);

        assertEq(pouStaking.balanceOf(user1), 0.5 ether);
        assertEq(pouStaking.totalSupply(), 0.5 ether);
    }

    function test_Claim() public {
        vm.deal(user1, 1 ether);
        vm.prank(user1);
        pouStaking.stake{value: 1 ether}();

        // Simulate time passing to accumulate rewards
        skip(1 days);

        vm.prank(user1);
        uint256 earned = pouStaking.earned(user1);
        pouStaking.claim();

        assertEq(pouStaking.totalClaimed(), earned);
    }

    function test_SetDailyRewardRate() public {
        uint256 newRate = 0.0002 * 10 ** 18; // 0.02% per day
        pouStaking.setDailyRewardRate(newRate);
        assertEq(pouStaking.dailyRewardRate(), newRate);
    }

    function test_GetAllStakers() public {
        vm.deal(user1, 1 ether);
        vm.prank(user1);
        pouStaking.stake{value: 1 ether}();

        vm.deal(user2, 2 ether);
        vm.prank(user2);
        pouStaking.stake{value: 2 ether}();

        address[] memory stakers = pouStaking.getAllStakers();
        assertEq(stakers.length, 2);
        assertEq(stakers[0], user1);
        assertEq(stakers[1], user2);
    }

    function test_BalanceOf() public {
        vm.deal(user1, 1 ether);
        vm.prank(user1);
        pouStaking.stake{value: 1 ether}();

        assertEq(pouStaking.balanceOf(user1), 1 ether);
    }

    function test_Earned() public {
        vm.deal(user1, 1 ether);
        vm.prank(user1);
        pouStaking.stake{value: 1 ether}();

        // Simulate time passing to accumulate rewards
        skip(1 days);

        uint256 reward = pouStaking.earned(user1);
        assert(reward > 0);
    }
}
