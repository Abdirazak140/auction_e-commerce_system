package ecommerceServer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ecommerceServer.connection.AuctionResponse;
import ecommerceServer.entity.DutchAuction;
import ecommerceServer.entity.ForwardAuction;
import ecommerceServer.service.AuctionService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auctions")
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    
    
    //Place Bids on existing forward auction
    @PostMapping("/placeBid")
    public ResponseEntity<AuctionResponse> placeBid(
            @RequestParam Long auctionId,
            @RequestParam double bidAmount,
            @RequestParam String sessionId) {
        AuctionResponse response = auctionService.placeBid(auctionId, bidAmount, sessionId);

        return ResponseEntity.ok(response);

    }

    //Buy existing dutch auction
    @PostMapping("/buyProduct")
    public ResponseEntity<AuctionResponse> buyProduct(
            @RequestParam Long auctionId,
            @RequestParam String sessionId) {
        AuctionResponse response = auctionService.buyProduct(auctionId, sessionId);
            return ResponseEntity.ok(response);

    }
    
    
}
