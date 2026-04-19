package com.example.backend.controller;

import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.service.SkillService;
import com.example.backend.service.MatchService;
import com.example.backend.repository.JobRepository;
import com.example.backend.model.Job;



import java.util.*;

@RestController
@RequestMapping("/resume")
@CrossOrigin(origins = "http://localhost:3000")
public class ResumeController {

    @Autowired
    private SkillService skillService;

    @Autowired
    private MatchService matchService;

    @Autowired
    private JobRepository jobRepository;

    @PostMapping("/upload")
    public List<Map<String, Object>> uploadResume(@RequestParam("file") MultipartFile file) {
        try {
            // Step 1: Extract text
            Tika tika = new Tika();
            String content = tika.parseToString(file.getInputStream());

            // Step 2: Extract skills
            List<String> userSkills = skillService.extractSkills(content);

            // Step 3: Get all jobs from DB
            List<Job> jobs = jobRepository.findAll();

            // Step 4: Match with each job
            List<Map<String, Object>> results = new ArrayList<>();

            for (Job job : jobs) {
                Map<String, Object> matchResult =
                        matchService.matchSkills(userSkills, job.getRequiredSkills());

                matchResult.put("jobTitle", job.getJobTitle());

                results.add(matchResult);
            }

            return results;

        } catch (Exception e) {
            return List.of(Map.of("error", "Processing failed"));
        }
    }
}