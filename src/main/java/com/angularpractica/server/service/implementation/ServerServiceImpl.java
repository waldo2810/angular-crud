package com.angularpractica.server.service.implementation;

import static com.angularpractica.server.enumeration.Status.SERVER_DOWN;
import static com.angularpractica.server.enumeration.Status.SERVER_UP;
import static java.lang.Boolean.TRUE;

import com.angularpractica.server.model.Server;
import com.angularpractica.server.repo.ServerRepo;
import com.angularpractica.server.service.ServerService;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.net.InetAddress;
import java.util.Collection;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ServerServiceImpl implements ServerService {

  private final ServerRepo serverRepo;

  @Override
  public Server create(Server server) {
    log.info("Saving new server: {}", server.getName());
    server.setImageUrl(setServerImageUrl());
    return serverRepo.save(server);
  }

  @Override
  public Server ping(String ipAddress) throws IOException {
    log.info("Pinging server IP: {}", ipAddress);
    Server server = serverRepo.findByIpAddress(ipAddress);
    InetAddress address = InetAddress.getByName(ipAddress);
    server.setStatus(address.isReachable(10000) ? SERVER_UP : SERVER_DOWN);
    serverRepo.save(server);
    return server;
  }

  @Override
  public Collection<Server> list(int limit) {
    log.info("Fetching all servers");
    return serverRepo.findAll().stream().toList();
  }

  @Override
  public Server get(Long id) {
    log.info("Fetching server by id {}", id);
    return serverRepo.findById(id).get();
  }

  @Override
  public Server update(Server server) {
    log.info("Updating server: {}", server.getName());
    return serverRepo.save(server);
  }

  @Override
  public Boolean delete(Long id) {
    log.info("Deleting server by id: {}", id);
    serverRepo.deleteById(id);
    return TRUE;
  }

  @Override
  public Server deleteByIpAddress(String ipAddress) {
    log.info("Deleting server by IP address: {}", ipAddress);
    Server deletedServer = serverRepo.findByIpAddress(ipAddress);
    serverRepo.deleteByIpAddress(ipAddress);
    return deletedServer;
  }

  private String setServerImageUrl() {
    String[] imageUrls = {
        "https://i.ibb.co/kX8ctvh/server1.png",
        "https://i.ibb.co/7bBrvmH/server2.png",
        "https://i.ibb.co/nfMxV7F/server3.png",
        "https://i.ibb.co/H2pMbcD/server4.png"
    };
    int randomIndex = new Random().nextInt(imageUrls.length);
    return imageUrls[randomIndex];
  }
}

