package com.example.backend.service;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SkillService {

    private static final List<String> SKILLS = Arrays.asList(
            "java", "python", "sql", "react", "spring boot",
            "html", "css", "javascript", "mysql", "docker"
    );

    public List<String> extractSkills(String text) {
        text = text.toLowerCase();

        List<String> foundSkills = new ArrayList<>();

        for (String skill : SKILLS) {
            if (text.contains(skill)) {
                foundSkills.add(skill);
            }
        }

        return foundSkills;
    }
}