// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.24;


import "./Pools.sol";
import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";
import "openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";

contract PouFactory is Ownable, ReentrancyGuard {
    struct InfosPool {
        ERC20 tokenA;
        ERC20 tokenB;
    }

    mapping (address => InfosPool) public pools;
    address[] pairsAddresses;
    ERC20[] public tokens;

    uint256 private fee; // 1% = 100

    event NewPoolCreated(address poolAddress);

    constructor() Ownable(msg.sender){
        fee = 10; // 0.1%
    }

    function createPool(address _addressA, address _addressB, uint256 _amountA, uint256 _amountB) external nonReentrant {
        ERC20 _tokenA = ERC20(_addressA);
        ERC20 _tokenB = ERC20(_addressB);

        require(!existPair(_tokenA, _tokenB), "Pool already exist");
        require(_tokenA.allowance(msg.sender, address(this)) >= _amountA * 10 ** _tokenA.decimals(), "no allowance for tokenA");
        require(_tokenB.allowance(msg.sender, address(this)) >= _amountB * 10 ** _tokenB.decimals(), "no allowance for tokenB");

        if(!existToken(_tokenA)){
            tokens.push(_tokenA);
        }
        if(!existToken(_tokenB)){
            tokens.push(_tokenB);
        }
        
        PouPools newPool = new PouPools(_tokenA, _tokenB, address(this));
        newPool.initPool(_amountA, _amountB);
        _tokenA.transferFrom(msg.sender, address(newPool), _amountA);
        _tokenB.transferFrom(msg.sender, address(newPool), _amountB);

        pools[address(newPool)] = InfosPool(_tokenA, _tokenB);
        pairsAddresses.push(address(newPool));
        emit NewPoolCreated(address(newPool));
    }

    function existPair(ERC20 _tokenA, ERC20 _tokenB) view internal returns(bool) {
        uint pairsLenght = pairsAddresses.length;
        for (uint i = 0; i < pairsLenght; i++){
            address pairsAddress = pairsAddresses[i];
            if(pools[pairsAddress].tokenA == _tokenA && pools[pairsAddress].tokenB == _tokenB){
                return true;
            }
            if(pools[pairsAddress].tokenA == _tokenB && pools[pairsAddress].tokenB == _tokenA){
                return true;
            }
        }
        return false;
    }

    function existToken(ERC20 _token) view internal returns(bool) {
        uint tokensLenght = tokens.length;
        for (uint i = 0; i < tokensLenght; i++){
            if(tokens[i] == _token){
                return true;
            }
        }
        return false;
    }

    function getPairsAddresses() view public returns(address[] memory){
        return pairsAddresses;
    }

    function getPairsAddress(uint _pairIndex) view public returns(address){
        return pairsAddresses[_pairIndex];
    }

    function getFees() view external returns(uint256){
        return fee;
    }

    function setFees(uint256 _fee) external onlyOwner {
        fee = _fee;
    }

    function getTokensAmountToClaim() view external returns(uint256[] memory, ERC20[] memory){
        uint tokensLenght = tokens.length;
        uint[] memory tokensAmountToClaim = new uint[](tokensLenght);
        for (uint i = 0; i < tokensLenght; i++){
            tokensAmountToClaim[i] = tokens[i].balanceOf(address(this));
        }
        return (tokensAmountToClaim, tokens);
    }

    function claimTokens(ERC20 _token) external onlyOwner {
        _token.transfer(msg.sender, _token.balanceOf(address(this)));
    }
}
