package com.angularpractica.server.enumeration;

public enum Status {
    SERVER_UP("SERVER_UP"), SERVER_DOWN("SERVER_DOWN");

    private final String serverStatus;

    Status(String serverStatus) {
        this.serverStatus = serverStatus;
    }

    public String getServerStatus() {
        return this.serverStatus;
    }
}
