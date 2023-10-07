export const addConversation = async (data: object) => {
  await fetch("/api/conversations", {
    method: "POST",
    cache: "no-cache",
    // user type: 'message' should be dynamic later when voice recording is added
    // so if user's msg was a text, it will pass it as text, or else "audio"
    body: JSON.stringify({
      messages: data,
    }),
  });
};
