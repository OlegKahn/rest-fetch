package com.example.restandfetch.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.util.Assert;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users_roles")
public class Role implements GrantedAuthority {

    @Transient
    private static final long serialVersionUID = 560L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role", unique = true)
    private String role;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.REFRESH}, fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> users;

    public Role() {
    }

    public Role(String role) {
        Assert.hasText(role, "A granted authority textual representation is required");
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @JsonIgnore
    @Override
    public String getAuthority() {
        return "ROLE_" + role;
    }

    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        } else {
            return (obj instanceof Role) && this.role.equals(((Role) obj).role);
        }
    }

    public int hashCode() {
        return this.role.hashCode();
    }

    public String toString() {
        return this.role;
    }
}
