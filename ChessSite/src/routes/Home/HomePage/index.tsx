import './styles.css'
import { SideMenu } from '../../../components/HomePage/HomePagePieces/SideMenu'
import { NewsCarousel } from '../../../components/HomePage/HomePagePieces/Carroussel'
import { ActionCards } from '../../../components/HomePage/HomePagePieces/Call To Action Card'


export default function HomePage()
{
    return(
        <div className="flex h-[calc(100vh-64px)]">
            <SideMenu />
            <main className="flex-1 p-6 space-y-6">
            <NewsCarousel />
            <ActionCards />
            </main>
        </div>
    );
}