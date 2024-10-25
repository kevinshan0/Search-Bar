<script lang="ts">
    import * as Card from "./ui/card"

    let props = $props();
    let title = props.title;
    let content = props.content;
    let meta;
</script>

<Card.Root class="w-[400px]">
    <Card.Header>
        <Card.Title tag="h1">{title}</Card.Title>
    </Card.Header>
    <Card.Content>
        <p>{content}</p>
    </Card.Content>
</Card.Root>