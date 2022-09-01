package ai.answerny.chatbot.controller;

import lombok.Builder;
import lombok.Data;
import org.codehaus.jackson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
public class MockApiController {

    @Autowired
    ChatbotConfigService chatbotConfigService;

    @GetMapping(value = "/chatbot/{id}")
    public ChatbotConfig getChatbotConfig(@PathVariable("id") String id) {
//        switch( id ) {
//            case "snu":
//                return ChatbotConfig.builder()
//                    .id("snu")
//                    .profileName("서울대")
//                    .profileImg("http://localhost:8080/static/img/image_greeting.png")
//                    .headerImg("http://localhost:8080/static/img/image_greeting.png")
//                    .build();
//            case "cau":
//                return ChatbotConfig.builder()
//                    .id("cau")
//                    .profileName("중앙대")
//                    .profileImg("http://localhost:8080/static/img/image_greeting.png")
//                    .headerImg("http://localhost:8080/static/img/image_greeting.png")
//                    .build();
//            default:
//                throw new NoSuchElementException("해당하는 아이디의 설정값이 존재하지 않습니다.");
//        }

        return chatbotConfigService.findById(id)
                .orElseThrow(() -> new NoSuchElementException("해당하는 아이디의 설정값이 존재하지 않습니다."));
    }


    /**
     * TODO API 요청에 따라 테넌트별 DB가 붙어야 함
     */
//    @GetMapping(value = "/chatbot/api/{id}")
//    public ChatbotConfig sendChatbotConfig(Model model, @PathVariable("id") String id) {
//
//        ModelAndView mav = new ModelAndView();
//        mav.setViewName("chatbot_sample");
//        mav.addObject("id", id);
//
//        return mav;
//    }


}



//interface

@Service
class InMemoryChatbotConfigServiceImpl implements ChatbotConfigService {
    private Map<String, ChatbotConfig> repository = new HashMap<>();

    public InMemoryChatbotConfigServiceImpl() {
        ChatbotConfig snuConfig = ChatbotConfig.builder()
                .id("snu")
                .profileName("서울대")
                .profileImg("http://localhost:8080/static/img/image_greeting.png")
                .headerImg("http://localhost:8080/static/img/image_greeting.png")
                .build();
        ChatbotConfig cauConfig = ChatbotConfig.builder()
                .id("cau")
                .profileName("중앙대")
                .profileImg("http://localhost:8080/static/img/image_greeting.png")
                .headerImg("http://localhost:8080/static/img/image_greeting.png")
                .build();

        repository.put(snuConfig.getId(), snuConfig);
        repository.put(cauConfig.getId(), cauConfig);

    }

    @Override
    public Optional<ChatbotConfig> findById(@PathVariable("id") String id) {
        return Optional.ofNullable(repository.get(id));
    }
}

@Data
@Builder
class ChatbotConfig {
    String id;
    String profileName;
    String profileImg;
    String headerImg;
}
