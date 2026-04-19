package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.model.Job;

public interface JobRepository extends JpaRepository<Job, Integer> {
}