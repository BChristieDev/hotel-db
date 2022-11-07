package comp74.hoteldb.model.repos;

import org.springframework.data.repository.PagingAndSortingRepository;

import comp74.hoteldb.model.entities.Guest;

public interface GuestRepo extends PagingAndSortingRepository<Guest, Long> {}