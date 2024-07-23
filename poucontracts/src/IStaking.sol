// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;

interface IPouStaking {
    function stake() external payable;
    function unstake(uint256 amount) external;
    function claim() external;
    function setDailyRewardRate(uint256 _dailyRewardRate) external;
    function getAllStakers() external view returns(address[] memory);
    function balanceOf(address account) external view returns (uint256);
    function earned(address account) external view returns (uint256);
}
