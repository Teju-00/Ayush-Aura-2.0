import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import FavoriteButton from "../components/FavoriteButton";
import plants from "../data/plants";

/* ---------------- Layout ---------------- */

const PageContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BackButton = styled.button`
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--accent-primary);
  padding: 0.5rem 1rem;
  border-radius: 0.6rem;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 1.5rem;

  &:hover {
    background: var(--accent-light);
  }
`;

const PlantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const PlantName = styled.h1`
  font-size: 2.4rem;
  font-weight: 800;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const PlantCategory = styled.span`
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.4rem 0.9rem;
  background: var(--accent-gradient);
  color: #fff;
  border-radius: 0.6rem;
  font-size: 0.85rem;
  font-weight: 600;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

/* ---------------- 3D Model ---------------- */

const ModelSection = styled.div`
  background: var(--bg-secondary);
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid var(--border-color);
`;

const ModelWrapper = styled.div`
  width: 100%;
  height: 420px;
  border-radius: 1rem;
  overflow: hidden;
  background: #ffffff;
`;

const ModelFallback = styled.div`
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  font-weight: 500;
`;

/* ---------------- Info ---------------- */

const InfoSection = styled.div`
  background: var(--bg-secondary);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--accent-primary);
`;

const InfoItem = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.strong`
  display: block;
  margin-bottom: 0.3rem;
`;

const Text = styled.p`
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
`;

/* ---------------- Animations ---------------- */

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

/* ---------------- Component ---------------- */

export default function PlantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const plant = plants.find((p) => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!plant) {
    return (
      <PageContainer>
        <h2>Plant not found</h2>
        <BackButton onClick={() => navigate("/plants")}>
          ← Back to Plants
        </BackButton>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.4 }}
    >
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>

      <SEO
        title={plant.name}
        description={plant.description}
        image={plant.image}
        type="article"
      />

      <PlantHeader>
        <div>
          <PlantName>{plant.name}</PlantName>
          <PlantCategory>{plant.category}</PlantCategory>
        </div>
        <FavoriteButton plantId={plant.id} />
      </PlantHeader>

      <ContentGrid>
        {/* ---------- 3D MODEL ---------- */}
        <ModelSection>
          <SectionTitle>3D Model</SectionTitle>

          {plant.modelUrl ? (
            <ModelWrapper>
              <model-viewer
                src={plant.modelUrl}
                alt={`${plant.name} 3D model`}
                camera-controls
                auto-rotate
                rotation-per-second="30deg"
                shadow-intensity="1"
                style={{ width: "100%", height: "100%" }}
              />
            </ModelWrapper>
          ) : (
            <ModelFallback>No 3D model available</ModelFallback>
          )}
        </ModelSection>

        {/* ---------- INFO ---------- */}
        <InfoSection>
          <SectionTitle>Overview</SectionTitle>

          <InfoItem>
            <Label>Scientific Name</Label>
            <Text>{plant.scientificName}</Text>
          </InfoItem>

          <InfoItem>
            <Label>Description</Label>
            <Text>{plant.description}</Text>
          </InfoItem>
        </InfoSection>
      </ContentGrid>

      {/* ---------- EXTRA SECTIONS ---------- */}
      {plant.medicinalProperties && (
        <InfoSection style={{ marginTop: "2rem" }}>
          <SectionTitle>Medicinal Properties</SectionTitle>
          <ul>
            {plant.medicinalProperties.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </InfoSection>
      )}

      {plant.uses && (
        <InfoSection style={{ marginTop: "2rem" }}>
          <SectionTitle>Traditional Uses</SectionTitle>
          <ul>
            {plant.uses.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        </InfoSection>
      )}

      {plant.funFacts && (
        <InfoSection style={{ marginTop: "2rem" }}>
          <SectionTitle>Interesting Facts</SectionTitle>
          <ul>
            {plant.funFacts.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </InfoSection>
      )}
    </PageContainer>
  );
}
