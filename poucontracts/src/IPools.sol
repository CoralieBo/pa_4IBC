// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;

interface IPouPools {
    struct Provider {
        uint256 amountA;
        uint256 amountB;
        uint256 feesA;
        uint256 feesB;
    }

    function addLiquidity(uint256 _amountA, uint256 _amountB) external;
    function removeLiquidity(uint256 _amountA, uint256 _amountB) external;
    function swap(uint256 _amountFrom, address _tokenFrom) external;
    function claim() external;
    function getExactToken(uint256 _amountFrom, address _tokenFrom) view external returns(uint256 _amountA);
    function getRateAforB() view external returns(uint256);
    function getRateBforA() view external returns(uint256);
    function getSupplyA() view external returns(uint256);
    function getSupplyB() view external returns(uint256);
    function getLiquidityProviders() view external returns(address[] memory);
    function getStatus() view external returns(bool);
}