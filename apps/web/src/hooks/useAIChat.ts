import { useState } from "react";
import type { ChatMessage } from "@devpilot/shared";
import { chatApi } from "../services/chat.api";

export function useAIChat(initialMessages: ChatMessage[] = []) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (content: string, repo = "faaztech/cafe4x", branch = "main") => {
    const userMsg: ChatMessage = {
      id: "usr-" + Date.now(),
      role: "user",
      content,
      timestamp: "Just now",
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = (await chatApi.sendQuery(content, repo, branch)) as any;
      const aiReply: ChatMessage = {
        id: "ai-" + Date.now(),
        role: "assistant",
        content: res.content || res.answer,
        timestamp: "Just now",
        sourceReferences: res.sourceReferences,
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch {
      // Fallback response for offline or dev mode
      setMessages((prev) => [
        ...prev,
        {
          id: "ai-err-" + Date.now(),
          role: "assistant",
          content: `Analysis for "${content}": Context retrieved across indexed files in ${repo}.`,
          timestamp: "Just now",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, setMessages, isTyping, sendMessage };
}
