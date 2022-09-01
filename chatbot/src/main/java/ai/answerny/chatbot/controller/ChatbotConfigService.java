package ai.answerny.chatbot.controller;

import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

public interface ChatbotConfigService {
    Optional<ChatbotConfig> findById(@PathVariable("id") String id);

}
