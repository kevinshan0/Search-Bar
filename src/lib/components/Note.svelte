<script lang="ts">
    let props = $props();
    let title = props.title;
    let content = props.content;
    let meta;
</script>

<div>
    <h1>{title}</h1>
    <p>{content}</p>
</div>