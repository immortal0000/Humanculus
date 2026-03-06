import anthropic
from app.config import ANTHROPIC_API_KEY, MODEL_ID


def get_client() -> anthropic.Anthropic:
    return anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)


async def generate_completion(system_prompt: str, user_prompt: str, max_tokens: int = 4096) -> str:
    client = get_client()
    message = client.messages.create(
        model=MODEL_ID,
        max_tokens=max_tokens,
        system=system_prompt,
        messages=[{"role": "user", "content": user_prompt}],
    )
    return message.content[0].text
