---
title: 'Python - Send a message to MS channel'
description: 'Use MS webhook to send a message to channel'
date: '2021-01-01'
---
### Steps
0. End result. A message on channel.
    ![](https://github.com/az-09/python-send-a-message-to-team-channel/blob/main/images/0.jpg?raw=true)

1. Join or create a team https://mail.google.com/chat/u/0/ and create a new space.
    ![](https://github.com/az-09/python-send-a-message-to-team-channel/blob/main/images/1.jpg?raw=true)
    ![](https://github.com/az-09/python-send-a-message-to-team-channel/blob/main/images/2.jpg?raw=true)

2. Create a team from scratch.
    ![](https://github.com/az-09/python-send-a-message-to-team-channel/blob/main/images/3.jpg?raw=true)

3. Team for either private or public.
    ![](https://github.com/az-09/python-send-a-message-to-team-channel/blob/main/images/4.jpg?raw=true)

4. Team name. eg) Demo
    ![](https://github.com/az-09/python-send-a-message-to-team-channel/blob/main/images/5.jpg?raw=true)

5. More options on channel. eg) Demo >> General >> More options
    ![](https://github.com/az-09/python-send-a-message-to-team-channel/blob/main/images/6.jpg?raw=true)

6. Connectors to add a new incoming webhook.
    ![](https://github.com/az-09/python-send-a-message-to-team-channel/blob/main/images/7.jpg?raw=true)

7. Add Incoming Webhook.
    ![](https://github.com/az-09/python-send-a-message-to-team-channel/blob/main/images/8.jpg?raw=true)

8. Connectors to configure the incoming webhook.
    ![](https://github.com/az-09/python-send-a-message-to-team-channel/blob/main/images/9.jpg?raw=true)

9. Configure Incoming Webhook.
    ![](https://github.com/az-09/python-send-a-message-to-team-channel/blob/main/images/10.jpg?raw=true)

10. Name of the webhook.
    ![](https://github.com/az-09/python-send-a-message-to-team-channel/blob/main/images/11.jpg?raw=true)

11. Copy the webhook url.
    ![](https://github.com/az-09/python-send-a-message-to-team-channel/blob/main/images/12.jpg?raw=true)

12. Create a new python file and paste below code. Update url to the webhook. eg) demo.py
    ```python
    #  https://developers.google.com/chat/quickstart/incoming-bot-python
    from json import dumps

    from httplib2 import Http


    def main():
        """Hangouts Chat incoming webhook quickstart."""
        url = '<INCOMING-WEBHOOK-URL>'
        bot_message = {
            'text' : 'Hello from a Python script!'}

        message_headers = {'Content-Type': 'application/json; charset=UTF-8'}

        http_obj = Http()

        response = http_obj.request(
            uri=url,
            method='POST',
            headers=message_headers,
            body=dumps(bot_message),
        )

        print(response)

    if __name__ == '__main__':
        main()
    ```
5. Run demo.py. Ctrl + F5 or Right click >> "Run Python File in Terminal"  within VS Code.

### [Github](https://github.com/az-09/python-send-a-message-to-team-channel.git)