package com.board.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.board.dao.BoardDAO;
import com.board.domain.BoardVO;

@Service
public class BoardServiceImpl implements BoardService {

	@Inject
	private BoardDAO dao;

	// 게시물 목록 조회
	@Override
	public List<BoardVO> list() throws Exception {

		return dao.list();
	}

//	@Override
//	public void write(BoardVO vo) throws Exception {
//		dao.write(vo);
//	}
//
//	// 게시물 조회
//	@Override
//	public BoardVO view(int bno) throws Exception {
//
//		return dao.view(bno);
//	}
//
//	// 게시물 수정
//	@Override
//	public void modify(BoardVO vo) throws Exception {
//
//		dao.modify(vo);
//	}
//
//	// 게시물 삭제
//	public void delete(int bno) throws Exception {
//		dao.delete(bno);
//	}
//
//	@Override
//	public int count() throws Exception {
//		// TODO Auto-generated method stub
//		return 0;
//	}
//
//	@Override
//	public List listPage(int displayPost, int postNum) throws Exception {
//		// TODO Auto-generated method stub
//		return null;
//	}
}