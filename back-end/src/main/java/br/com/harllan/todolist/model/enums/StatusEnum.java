package br.com.harllan.todolist.model.enums;

public enum StatusEnum {

	TODO ("Para Executar"),
	DOING ("Executando"),
	DONE ("Feito"),
	BLOCK ("Bloqueado");
	
	private String description;

	private StatusEnum(String description) {
		this.description = description;
	}
	
	public static Boolean isInvalid(String statusToVerify) {
		for(StatusEnum status: StatusEnum.values()) {
			if(status.name().equals(statusToVerify)) {
				return Boolean.FALSE;
			}
		}
		return Boolean.TRUE;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
