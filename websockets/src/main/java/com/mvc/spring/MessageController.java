package com.mvc.spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

	
	 @Autowired
	    private SimpMessagingTemplate simpMessagingTemplate;
	 
	 
	@MessageMapping("/chat")
	@SendTo("/topic/messages")
	 public MessageDto getMessages(@Payload MessageDto message){
	    System.out.println("sapna "+message.getMessage());
        return message;
    
    }
	
	@MessageMapping("/private-message")
    public MessageDto recMessage(@Payload MessageDto message){
        simpMessagingTemplate.convertAndSendToUser(message.getMessage(),"/private",message);
        System.out.println(message.toString());
        return message;
    }
}
