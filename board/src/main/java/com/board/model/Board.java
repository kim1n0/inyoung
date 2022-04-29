package com.board.model;

import java.util.Date;

public class Board {

	private int bno;
	private String title;
	private String content;
	private String writer;
	private Date regDate;
	private int viewCnt;

	public Board() {
	}

	public Board(int bno, String title, String content, String writer, Date regDate, int viewCnt) {
		this.bno = bno;
		this.title = title;
		this.content = content;
		this.writer = writer;
		this.regDate = regDate;
		this.viewCnt = viewCnt;
	}

	public int getBno() {
		return bno;
	}

	public void setBno(int bno) {
		this.bno = bno;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getWriter() {
		return writer;
	}

	public void setWriter(String writer) {
		this.writer = writer;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public int getViewCnt() {
		return viewCnt;
	}

	public void setViewCnt(int viewCnt) {
		this.viewCnt = viewCnt;
	}

}

//CREATE TABLE tbl_board(
//		bno int NOT NULL AUTO_INCREMENT,
//		title varchar(50) NOT NULL,
//		content text NOT NULL,
//		writer varchar(30) NOT NULL,
//		regDate timestamp NOT NULL DEFAULT now(),
//		viewCnt int DEFAULT 0,
//		PRIMARY key(bno)
//	);