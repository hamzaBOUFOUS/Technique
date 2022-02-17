package com.example.technique.ressources;

import org.apache.commons.io.FileUtils;
import org.apache.ibatis.jdbc.ScriptRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.example.technique.entities.CoordonneGPS;
import com.example.technique.services.CoordonneGPSService;

import java.io.*;
import java.nio.file.*;
import java.sql.*;
import java.sql.DriverManager;
import java.util.List;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping(value="/gps")
public class CoordonneGPSRessource {
    private final CoordonneGPSService coordonneGPSService;
    private String UPLOAD_DIR = "src/main/resources/static/";

    @Autowired
    public CoordonneGPSRessource(CoordonneGPSService coordonneGPSService) {
        this.coordonneGPSService = coordonneGPSService;
    }

    @GetMapping("/listcoor")
    public List<CoordonneGPS> ListMapPage(){
        return coordonneGPSService.getAllCoor();
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file){
            //------------file name-------------
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            try {
                //--------------remove file upload to new path-----------
                Path path = Paths.get(UPLOAD_DIR + fileName);
                Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
                ScriptRunner scriptRunner = new ScriptRunner(
                        DriverManager.getConnection("jdbc:mysql://localhost:3306/technique", "root", ""));
                //--------get Name Table of file---------------
                String content = FileUtils.readFileToString(new File(UPLOAD_DIR + fileName), "UTF-8");
                int debut = content.indexOf("CREATE TABLE `") + 14;
                int fin = content.indexOf("` (");
                String tableName = content.substring(debut, fin);
                //-------create table exist in file---------------
                Reader reader = new BufferedReader(new FileReader(UPLOAD_DIR + fileName));
                scriptRunner.runScript(reader);
                //-----------get data in file and insert coordonne to mysql-----------------------------
                getCoordonneGPSFromFile(tableName);
            } catch (Exception e) {
                return ResponseEntity.ok().body(HttpStatus.CONFLICT);
            }
        return ResponseEntity.ok().body(HttpStatus.OK);
    }

    public void getCoordonneGPSFromFile(String tableName) throws Exception {
        coordonneGPSService.deleteAllCoordonneGPS();
        try {
            Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/technique","root","");
            Statement statement = connection.createStatement();
            ResultSet results = statement.executeQuery("SELECT DISTINCT latitude,longitude FROM "+ tableName+" ORDER BY latitude, longitude");
            while (results.next()) {
                CoordonneGPS coordonneGPS = new CoordonneGPS();
                coordonneGPS.setLatitude(Double.parseDouble(results.getString("latitude")));
                coordonneGPS.setLongitude(Double.parseDouble(results.getString("longitude")));
                coordonneGPSService.addCoordonneGPS(coordonneGPS);
            }
        } catch (SQLException e) {
            System.out.println("111 "+e.getMessage());
        }
    }
}
