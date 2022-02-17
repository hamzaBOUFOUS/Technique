package com.example.technique.repositories;

import com.example.technique.entities.CoordonneGPS;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CoordonneGPSRepositorie extends JpaRepository<CoordonneGPS, Long> {

}
