package com.board.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.board.service.TestService;

@RestController
@RequestMapping("/")
public class HomeController {
	
//	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
//	
//	@RequestMapping(value = "/", method = RequestMethod.GET)
//	public String home(Locale locale, Model model) {
//		logger.info("Welcome home! The client locale is {}.", locale);
//		
//		Date date = new Date();
//		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
//		
//		String formattedDate = dateFormat.format(date);
//		
//		model.addAttribute("serverTime", formattedDate );
//		
//		return "home";
//	}
	
	@Autowired
	private TestService testService;
	
	@GetMapping("")
	public String test() {
		return "root url call";
	}
	
	@GetMapping("/json")
	public Map<String, String> jsonTest() {
		Map<String, String> res = new HashMap<>();
		res.put("test", "hiiiii");
		
		return res;
	}
	
	@GetMapping("/test")
	public Map<String, String> testMethod() {
		Map<String, String> res = this.testService.getTest();
		
		return res;
	}
}
