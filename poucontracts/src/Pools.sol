// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import "./IFactory.sol";

contract PouPools is ReentrancyGuard {
    ERC20 tokenA;
    ERC20 tokenB;
    uint public k; // Constant used to calculate the price (tokenA * tokenB = k)
    bool public closed;
    IPouFactory factory;

    struct Liq {
        uint256 amountA;
        uint256 amountB;        
    }
    mapping(address => Liq) public liquidityProvider;

    constructor(ERC20 _tokenA, ERC20 _tokenB, address _factory, uint256 _amountA, uint256 _amountB){
        tokenA = _tokenA;
        tokenB = _tokenB;
        factory = IPouFactory(_factory);
        k = _amountA * _amountB;
    }

    modifier isNotClosed(){
        require(!closed, "Pool is closed");
        _;
    }

    function addLiquidity(uint256 _amountA, uint256 _amountB) external nonReentrant isNotClosed() { // Pour calculer en front combien envoyé de B il faut faire : B = k / A
        require(tokenA.allowance(msg.sender, address(this)) >= _amountA, "no allowance for tokenA");
        require(tokenB.allowance(msg.sender, address(this)) >= _amountB, "no allowance for tokenB");
        require(_amountA * _amountB == k, "The ratio is bad");
        tokenA.transferFrom(msg.sender, address(this), _amountA);
        tokenB.transferFrom(msg.sender, address(this), _amountB);
        liquidityProvider[msg.sender].amountA += _amountA;
        liquidityProvider[msg.sender].amountB += _amountB;
    }

    function removeLiquidity(uint256 _amountA, uint256 _amountB) external nonReentrant {
        require(liquidityProvider[msg.sender].amountA >= _amountA, "Not enough liquidity for tokenA");
        require(liquidityProvider[msg.sender].amountB >= _amountB, "Not enough liquidity for tokenB");
        require(_amountA * _amountB == k, "The ratio is bad");
        liquidityProvider[msg.sender].amountA -= _amountA;
        liquidityProvider[msg.sender].amountB -= _amountB;
        tokenA.transfer(msg.sender, _amountA);
        tokenB.transfer(msg.sender, _amountB);
    }

    function swapAforB(uint256 _amountA) external nonReentrant isNotClosed {
        require(tokenA.allowance(msg.sender, address(this)) >= _amountA, "no allowance for tokenA");
        uint256 _amountB = getExactTokenB(_amountA);
        uint256 fees = factory.getFees();
        tokenA.transferFrom(msg.sender, address(this), _amountA);
        tokenB.transfer(address(factory), _amountB * fees / 100); // On envoie les fees à la factory
        tokenB.transfer(msg.sender, _amountB * (100 - fees) / 100); // On envoie 100% - fees%
    }

    function swapBforA(uint256 _amountB) external nonReentrant isNotClosed {
        require(tokenB.allowance(msg.sender, address(this)) >= _amountB, "no allowance for tokenB");
        uint256 _amountA = getExactTokenA(_amountB);
        uint256 fees = factory.getFees();
        tokenB.transferFrom(msg.sender, address(this), _amountB);
        tokenA.transfer(address(factory), _amountA * fees / 100); // On envoie les fees à la factory
        tokenA.transfer(msg.sender, _amountA * (100 - fees) / 100); // On envoie 100% - fees%
    }

    function getExactTokenA(uint256 _amountB) view public returns(uint256 _amountA) {
        return getSupplyA() - k / (getSupplyB() + _amountB);
    }

    function getExactTokenB(uint256 _amountA) view public returns(uint256 _amountB) {
        return getSupplyB() - k / (getSupplyA() + _amountA);
    }

    function getRateAforB() view external returns(uint256) { // Pour chaque A on a xB
        return tokenB.balanceOf(address(this)) * 10 ** tokenA.decimals() / tokenA.balanceOf(address(this));
    }

    function getRateBforA() view external returns(uint256) { // Pour chaque B on a xA
        return tokenA.balanceOf(address(this)) * 10 ** tokenB.decimals() / tokenB.balanceOf(address(this));
    }

    function getSupplyA() view public returns(uint256) {
        return tokenA.balanceOf(address(this));
    }

    function getSupplyB() view public returns(uint256) {
        return tokenB.balanceOf(address(this));
    }

    function getStatus() view external returns(bool) {
        return closed;
    }

    function closePool() external {
        require(msg.sender == factory.owner(), "Only the owner can close the pool");
        closed = true;
    }
}