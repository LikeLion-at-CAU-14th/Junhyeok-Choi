import styled from 'styled-components';
const LionCard = ({ data }) => {
    return (
        <CardLayout>
            {/* 성별 뱃지 */}
            <GenderBadge $gender={data.gender}>
                {data.gender === 'male' ? '👦 남' : '👧 여'}
            </GenderBadge>

            {/* 사자 아이콘 */}
            <LionIcon>🦁</LionIcon>

            {/* 이름 */}
            <Name>{data.name}</Name>

            {/* 파트 */}
            <Part>프론트엔드</Part>
        </CardLayout>
    );
};

export default LionCard;
const CardLayout = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 160px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    padding: 20px;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 20px rgba(255, 113, 0, 0.15);
    }
`;

const GenderBadge = styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 8px;
    background-color: ${(props) => props.$gender === 'male' ? '#e3f0ff' : '#ffe3f0'};
    color: ${(props) => props.$gender === 'male' ? '#1a6bc4' : '#c41a6b'};
    font-weight: 600;
`;

const LionIcon = styled.div`
    font-size: 42px;
    margin-bottom: 8px;
`;

const Name = styled.p`
    font-size: 18px;
    font-weight: 800;
    color: #1a1a1a;
    margin-bottom: 4px;
`;

const Part = styled.p`
    font-size: 13px;
    color: #FF7100;
    font-weight: 600;
`;