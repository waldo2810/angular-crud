package com.angularpractica.server.repo;

import com.angularpractica.server.model.Server;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServerRepo extends JpaRepository<Server, Long> {

    Server findByIpAddress(String ipAddress);

    void deleteByIpAddress(String ipAddress);
}
