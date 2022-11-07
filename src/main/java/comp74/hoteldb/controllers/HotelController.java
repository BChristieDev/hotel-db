package comp74.hoteldb.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import comp74.hoteldb.model.entities.Guest;
import comp74.hoteldb.model.repos.GuestRepo;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class HotelController {

    GuestRepo guestRepo;
    final int SIZE = 12;

    @Autowired
    public HotelController(GuestRepo guestRepo) {
        super();

        this.guestRepo = guestRepo;
    }

    @GetMapping("/guests")
    public Page<Guest> getGuestsPage(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "id") String sort) {

        PageRequest pageInfo;

        pageInfo = PageRequest.of(page, SIZE, Sort.by(sort));
    
        return (Page<Guest>) guestRepo.findAll(pageInfo);
    
    }
}