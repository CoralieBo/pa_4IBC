// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;

import "./Pools.sol";

interface IPouFactory {
    struct InfosPool {
        ERC20 tokenA;
        ERC20 tokenB;
        bool isClosed;
    }
    function createPool(address _addressA, address _addressB, uint256 _amountA, uint256 _amountB) external;
    function getPairsAddresses() view external returns(address[] memory, InfosPool[] memory);
    function getPairAddress(address token1, address token2) view external returns(address);
    function getFees() view external returns(uint256);
    function setFees(uint256 _fee) external;
    function getTokensAmountToClaim() view external returns(uint256[] memory, ERC20[] memory);
    function claimTokens(ERC20 _token) external;
    function claimAll() external;
    function closePool(address _pairAddress) external;
}
