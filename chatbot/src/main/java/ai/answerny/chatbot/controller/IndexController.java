package ai.answerny.chatbot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class IndexController {

    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute("profile_name", "서울대");
        return "chatbot_sample";
    }
}

