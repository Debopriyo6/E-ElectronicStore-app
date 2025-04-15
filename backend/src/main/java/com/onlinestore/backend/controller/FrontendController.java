package com.onlinestore.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FrontendController {

    @RequestMapping({
        "/home",
        "/login",
        "/reg",
        "/services",
        "/bill"
    })
    public String forwardToIndex() {
        // This will serve index.html for those paths
        return "forward:/index.html";
    }
}
