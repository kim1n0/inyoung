package com.board.service;

import java.util.List;
import com.board.domain.BoardVO;

public interface BoardService {

	// �Խù� ���
	public List<BoardVO> list() throws Exception;

//	// �Խù� �ۼ�
//	public void write(BoardVO vo) throws Exception;
//
//	// �Խù� ��ȸ
//	public BoardVO view(int bno) throws Exception;
//
//	// �Խù� ����
//	public void modify(BoardVO vo) throws Exception;
//
//	// �Խù� ����
//	public void delete(int bno) throws Exception;
//	
//	// �Խù� �� ����
//	public int count() throws Exception;
//	
//	// �Խù� ��� + ����¡
//	public List listPage(int displayPost, int postNum) throws Exception;
}