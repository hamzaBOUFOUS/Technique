package com.example.technique.services;

import com.example.technique.entities.CoordonneGPS;
import com.example.technique.repositories.CoordonneGPSRepositorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoordonneGPSService {
    private final CoordonneGPSRepositorie coordonneGPSRepositorie;

    @Autowired
    public CoordonneGPSService(CoordonneGPSRepositorie coordonneGPSRepositorie) {
        this.coordonneGPSRepositorie = coordonneGPSRepositorie;
    }

    public Page<CoordonneGPS> getAllCoor(Integer page, Integer size) {
        return coordonneGPSRepositorie.findAll(PageRequest.of(page, size));
    }

    public List<CoordonneGPS> getAllListCoor() {
        return coordonneGPSRepositorie.findAll();
    }

    public void addCoordonneGPS(CoordonneGPS coordonneGPS) throws Exception {
        try {
            coordonneGPSRepositorie.save(coordonneGPS);
        }catch (Exception e){
            System.out.println("333 "+ e.getMessage());
        }
    }

    public boolean testTableVide() {
        if (coordonneGPSRepositorie.findAll().size()>0){
            return false;
        }
        return true;
    }

    public void deleteAllCoordonneGPS() throws Exception {
        coordonneGPSRepositorie.deleteAll();
    }
}
