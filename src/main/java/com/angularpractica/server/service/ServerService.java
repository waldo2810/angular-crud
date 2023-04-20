package com.angularpractica.server.service;

import com.angularpractica.server.model.Server;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.Collection;

public interface ServerService {

    Server create(Server server) throws NoSuchAlgorithmException;

    Server ping(String ipAddress) throws IOException;

    Collection<Server> list(int limit);

    Server get(Long id);

    Server update(Server server);

    Boolean delete(Long id);

    Server deleteByIpAddress(String ipAddress);

}
