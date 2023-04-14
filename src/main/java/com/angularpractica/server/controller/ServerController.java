package com.angularpractica.server.controller;

import static com.angularpractica.server.enumeration.Status.SERVER_UP;
import static java.time.LocalDateTime.now;
import static java.util.Map.of;
import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.OK;

import com.angularpractica.server.model.Response;
import com.angularpractica.server.model.Server;
import com.angularpractica.server.service.implementation.ServerServiceImpl;
import jakarta.validation.Valid;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/server")
@RequiredArgsConstructor
public class ServerController {

  private final ServerServiceImpl serverService;

  @GetMapping("/list")
  public ResponseEntity<Response> getServers() {
    return ResponseEntity.ok(Response.builder()
        .timestamp(now())
        .data(of("servers", serverService.list(30)))
        .message("Servers retrieved")
        .status(OK)
        .statusCode(OK.value())
        .build()
    );
  }

  @GetMapping("/ping/{ipAddress}")
  public ResponseEntity<Response> pingServer(@PathVariable("ipAddress") String ipAddress)
      throws IOException {
    Server server = serverService.ping(ipAddress);
    return ResponseEntity.ok(
        Response.builder()
            .timestamp(now())
            .data(of("server", server))
            .message(server.getStatus() == SERVER_UP ? "Ping success" : "Failed to ping")
            .status(OK)
            .statusCode(OK.value())
            .build()
    );
  }

  @GetMapping("/get/{id}")
  public ResponseEntity<Response> getServer(@PathVariable("id") Long id) {
    return ResponseEntity.ok(Response.builder()
        .timestamp(now())
        .data(of("server", serverService.get(id)))
        .message("Server retrieved")
        .status(OK)
        .statusCode(OK.value())
        .build()
    );
  }

  @PostMapping("/save")
  public ResponseEntity<Response> saveServer(@RequestBody @Valid Server server) {
    return ResponseEntity.ok(Response.builder()
        .timestamp(now())
        .data(of("server", serverService.create(server)))
        .message("Server created")
        .status(CREATED)
        .statusCode(CREATED.value())
        .build()
    );
  }

  @DeleteMapping("/delete/{ipAddress}")
  public ResponseEntity<Response> deleteServer(@PathVariable("ipAddress") String ipAddress) {
    Server deletedServer = serverService.deleteByIpAddress(ipAddress);
    if (deletedServer == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    return ResponseEntity.ok(
        Response.builder()
            .timestamp(now())
            .data(of("server", deletedServer))
            .message("Server deleted")
            .status(OK)
            .statusCode(OK.value())
            .build()
    );
  }
}
