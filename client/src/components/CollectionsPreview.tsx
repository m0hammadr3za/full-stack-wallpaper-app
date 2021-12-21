import { useEffect, useState } from "react";
import SectionGrid from "./SectionGrid";
import SectionInfoContainer from "./SectionInfoContainer";
import SectionTitle from "./SectionTitle";
import CollectionCard from "./CollectionCard";
import "../styles/CollectionsPreview.scss";

function CollectionsPreview() {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        (async () => {
            const collectionRes = await fetch("/api/collections/?limit=6");
            const popularCollections = await collectionRes.json();
            setCollections(popularCollections);
        })();
    }, []);

    return (
        <SectionGrid>
            <div className="collections-preview__title">
                <SectionInfoContainer>
                    <SectionTitle>
                        MOST <br />
                        POPULAR <br />
                        COLLECTIONS
                    </SectionTitle>
                </SectionInfoContainer>
            </div>

            {collections.length > 0 &&
                collections.map((collection: any) => {
                    return (
                        <div className="collections-preview__card" key={collection._id}>
                            <CollectionCard data={collection} />
                        </div>
                    );
                })}
        </SectionGrid>
    );
}

export default CollectionsPreview;