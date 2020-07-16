import React from 'react';
import styled from 'styled-components';

export const Content = ({ musicData, topArtistData }) => {
	return (
		<Container>
			<Box>
				<h1>DISCOVER</h1>
				<Titles>My top artists</Titles>
				{/* {topArtistData.items &&
          topArtistData.items.map(artist => <p>{artist.name}</p>)} */}
				<Wrapper>
					{topArtistData.items &&
						topArtistData.items.map(
							(artist, index) =>
								index < 5 && (
									<ArtistBox>
										<img
											style={{
												width: '60px',
												height: '60px',
												borderRadius: '10px'
											}}
											src={artist.images[0].url}
										/>
										<ArtistTitle>{artist.name}</ArtistTitle>
									</ArtistBox>
								)
						)}
				</Wrapper>
				<Titles>Based on your music taste</Titles>
			</Box>
		</Container>
	);
};

export default Content;

export const Container = styled.div`
	display: flex;
	padding: 2%;
`;

export const Titles = styled.h2`
	color: #333333;
	font-family: arial;
	font-size: 20px;
	letter-spacing: 3px;
	text-transform: uppercase;
`;

export const ArtistTitle = styled.p`
	color: white;
	margin-left: 6%;
	font-size: 12px;
	margin-top: 10%;
`;

export const Box = styled.div`
	display: flex;
	flex-direction: column;
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	width: 50%;
`;

export const ArtistBox = styled.div`
	display: flex;
	flex-direction: row;
	width: 400px;
	margin-right: 20px;
	border-radius: 10px;
	background-color: #333333;
	box-shadow: 5px 5px 15px #888888;
`;
