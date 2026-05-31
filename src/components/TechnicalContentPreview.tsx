import FeaturedContent from "../helpers/FeaturedContent"
import { TechnicalContentArticle } from "@/src/components";

export default function TechnicalContentPreview() {
    const featuredContent = FeaturedContent.getTechnicalContent();
    return (
        <>
        {featuredContent && featuredContent.map((content, idx)=> (
            <TechnicalContentArticle key={idx} content={content} />
        ))}
        </>
    )
}