// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

pragma solidity ^0.8.7;

contract  BasicNFT is ERC721 {
    string public constant TOKEN_URI = "ipfs://QmXUVBaUVQb6DEsXH2wnry2pHQSN73i7TvVsWXNp5NHohG";
    uint256 private s_tokenCounter;
    constructor() ERC721("Brunutsu", "BRN") {
        s_tokenCounter = 0;
    }

    function mint() public returns (uint256) {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
        return s_tokenCounter;
    }

    function tokenURI(uint256 /*_tokenId*/) public view override returns(string memory){
        // require(exists(_tokenId));
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns(uint256){
        return s_tokenCounter;
    }
}