package com.example.backend.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class MatchService {

    public Map<String, Object> matchSkills(List<String> userSkills, String jobSkills) {

        List<String> jobSkillList = Arrays.asList(jobSkills.toLowerCase().split(","));

        List<String> common = new ArrayList<>();
        List<String> missing = new ArrayList<>();

        for (String skill : jobSkillList) {
            skill = skill.trim();

            if (userSkills.contains(skill)) {
                common.add(skill);
            } else {
                missing.add(skill);
            }
        }

        double matchPercent = (double) common.size() / jobSkillList.size() * 100;

        Map<String, Object> result = new HashMap<>();
        result.put("matchPercentage", matchPercent);
        result.put("matchedSkills", common);
        result.put("missingSkills", missing);

        return result;
    }
}