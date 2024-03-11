package ecommerceServer.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecommerceServer.connection.AuctionResponse;
import ecommerceServer.entity.DutchAuction;
import ecommerceServer.entity.ForwardAuction;
import ecommerceServer.entity.Session;
import ecommerceServer.repository.DutchAuctionRepository;
import ecommerceServer.repository.ForwardAuctionRepository;
import ecommerceServer.repository.ProductRepository;
import ecommerceServer.repository.SessionRepository;


@Service
public class AuctionService {

    @Autowired
    private DutchAuctionRepository dutchAuctionRepository;
    
    @Autowired
    private ForwardAuctionRepository forwardAuctionRepository;
    
	@Autowired
	private SessionRepository sessionRepository;

    @Autowired
    private ProductRepository catalogueRepository;
    
    public AuctionResponse placeBid(Long auctionId, double bidAmount, String sessionId) {
        Optional<ForwardAuction> auctionOptional = forwardAuctionRepository.findById(auctionId);
        Session session = sessionRepository.findBySessionId(sessionId);

        if (!auctionOptional.isPresent()) {
            return new AuctionResponse(false, "Auction does not exist");
        }

        ForwardAuction auction = auctionOptional.get();

        if (session == null) {
            return new AuctionResponse(false, "Must be logged in");
        } else {
            if (auction.getAuctionStatus() != 1) {
                return new AuctionResponse(false, "Auction is not open for bidding");
            }

            if (bidAmount <= 0) {
                return new AuctionResponse(false, "Bid amount must be a positive value");
            }

            if (bidAmount <= auction.getHighestBid()) {
                return new AuctionResponse(false, "Bid amount must be higher than the current highest bid");
            }
            
            if (session.getUserId() == auction.getCurrentHighestBidderId()) {
                return new AuctionResponse(false, "You are already the highest bidder");
            }

            auction.setHighestBid(bidAmount);
            auction.setCurrentHighestBidderId(session.getUserId());

            forwardAuctionRepository.save(auction);

            return new AuctionResponse(true, "Bid placed successfully");
        }
    }
    
    public AuctionResponse buyProduct(Long auctionId, String sessionId) {
        Optional<DutchAuction> auctionOptional = dutchAuctionRepository.findById(auctionId);
        Session session = sessionRepository.findBySessionId(sessionId);

        if (!auctionOptional.isPresent()) {
            return new AuctionResponse(false, "Auction does not exist");
        }

        DutchAuction auction = auctionOptional.get();

        if (session == null) {
            return new AuctionResponse(false, "Must be logged in");
        } else {
            if (auction.getAuctionStatus() != 1) {
                return new AuctionResponse(false, "Auction is not open for bidding");
            }

            auction.setAuctionStatus(0); 
            auction.setBuyerId(session.getUserId());
            dutchAuctionRepository.save(auction);

            return new AuctionResponse(true, "Product bought successfully");
        }
    }


}
