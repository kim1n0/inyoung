package com.board.dao;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.board.domain.BoardVO;

@Repository
public class BoardDAOImpl implements BoardDAO {

	@Autowired
	private SqlSession sql;

	private static String namespace = "com.board.mappers.board";

	// �Խù� ���
	@Override
	public List<BoardVO> list() throws Exception {

		return sql.selectList(namespace + ".list");
	}
	
//	@Override
//	public void write(BoardVO vo) throws Exception {
//		sql.insert(namespace + ".write", vo);
//	}

//	// �Խù� ��ȸ
//	public BoardVO view(int bno) throws Exception {
//
//		return sql.selectOne(namespace + ".view", bno);
//	}
//
//	// �Խù� ����
//	@Override
//	public void modify(BoardVO vo) throws Exception {
//		sql.update(namespace + ".modify", vo);
//	}
//
//	// �Խù� ����
//	public void delete(int bno) throws Exception {
//		sql.delete(namespace + ".delete", bno);
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
//
////	// �Խù� �� ����
////	@Override
////	public int count() throws Exception {
////		return sql.selectOne(namespace + ".count");
////	}
////
////	// �Խù� ��� + ����¡
////	@Override
////	public List listPage(int displayPost, int postNum) throws Exception {
////
////		HashMap data = new HashMap();
////
////		data.put("displayPost", displayPost);
////		data.put("postNum", postNum);
////
////		return sql.selectList(namespace + ".listPage", data);
////	}

}