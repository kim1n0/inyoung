package com.board.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.board.domain.BoardVO;
import com.board.controller.BoardController;
import com.board.model.Board;
import com.board.service.BoardService;

@RestController
@RequestMapping("/board/*")
public class BoardController {

	@Autowired
	private BoardService service;

	// 게시물 목록 조회
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public void getList(Model model) throws Exception {

		List list = null;
		list = service.list();
		model.addAttribute("list", list);
	}

}