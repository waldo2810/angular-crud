package com.angularpractica.server.model;

import com.angularpractica.server.enumeration.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "server")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Server {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "ip_address", unique = true)
    @NotEmpty(message = "IP address cannot be empty or null")
    private String ipAddress;

    private String memory;

    private String name;

    private Status status;

    private String type;

}