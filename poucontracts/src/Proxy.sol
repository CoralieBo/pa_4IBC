// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;

import "openzeppelin-contracts/contracts/access/AccessControl.sol";
import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "./IFactory.sol";
import "./IPools.sol";
import "./IStaking.sol";

contract PouProxy is AccessControl{
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    IPouFactory pouFactory;
    IPouStaking pouStaking;

    constructor(address _factoryAddress, address _stakingAddress){
        pouFactory = IPouFactory(_factoryAddress);
        pouStaking = IPouStaking(_stakingAddress);
    }

    function addUser() external{
        grantRole(USER_ROLE, msg.sender);
    }

//////////// FACTORY CONTRACT ////////////
    function createPool(address _addressA, address _addressB, uint256 _amountA, uint256 _amountB) external onlyRole(USER_ROLE){
        pouFactory.createPool(_addressA, _addressB, _amountA, _amountB);
    }

    function setFees(uint256 _fee) external onlyRole(ADMIN_ROLE){
        pouFactory.setFees(_fee);
    }

    function claimTokens(ERC20 _token) external onlyRole(ADMIN_ROLE){
        pouFactory.claimTokens(_token);
    }

    function claimAll() external onlyRole(ADMIN_ROLE){
        pouFactory.claimAll();
    }

    function closePool(address _pairAddress) external onlyRole(ADMIN_ROLE){
        pouFactory.closePool(_pairAddress);
    }

//////////// POOL CONTRACT ////////////
    function addLiquidity(address _poolAddress, uint256 _amountA, uint256 _amountB) external onlyRole(USER_ROLE){
        IPouPools(_poolAddress).addLiquidity(_amountA, _amountB);
    }

    function removeLiquidity(address _poolAddress, uint256 _amountA, uint256 _amountB) external onlyRole(USER_ROLE){
        IPouPools(_poolAddress).removeLiquidity(_amountA, _amountB);
    }

    function swap(address _poolAddress, uint256 _amountFrom, address _tokenFrom) external onlyRole(USER_ROLE){
        IPouPools(_poolAddress).swap(_amountFrom, _tokenFrom);
    }

    function Poolsclaim(address _poolAddress) external onlyRole(USER_ROLE){
        IPouPools(_poolAddress).claim();
    }

//////////// STAKING CONTRACT ////////////

    function stake() external payable onlyRole(USER_ROLE){
        pouStaking.stake{value: msg.value}();
    }

    function unstake(uint256 _amount) external onlyRole(USER_ROLE){
        pouStaking.unstake(_amount);
    }

    function Stakingclaim() external onlyRole(USER_ROLE){
        pouStaking.claim();
    }

    function setDailyRewardRate(uint256 _dailyRewardRate) external onlyRole(ADMIN_ROLE){
        pouStaking.setDailyRewardRate(_dailyRewardRate);
    }

}