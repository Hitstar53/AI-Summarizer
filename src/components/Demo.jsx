import { useEffect, useState } from 'react'
import { copy, linkIcon, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';

const Demo = () => {
    const [article, setArticle] = useState({
        url: '',
        summary: '',
    });
    const [allArticles, setAllArticles] = useState([]);
    const [copied, setCopied] = useState(false);
    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

    useEffect(() => {
        const localArticles = JSON.parse(localStorage.getItem('articles'));
        if (localArticles) {
            setAllArticles(localArticles);
        }
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await getSummary({ articleUrl: article.url });
        if (data?.summary) {
            const newArticle = { ...article, summary: data.summary }
            const updatedAllArticles = [newArticle, ...allArticles];
            setArticle(newArticle);
            setAllArticles(updatedAllArticles);
            localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
        }
    }

    const copyToClipboard = (text) => {
        setCopied(text);
        navigator.clipboard.writeText(text);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    }
    return (
        <section className='mt-16 w-full max-w-xl'>
            <div className="flex flex-col w-full gap-2">
                <form action="" className='relative flex justify-center items-center' onSubmit={handleSubmit}>
                    <img src={linkIcon} className='absolute left-0 my-2 ml-3 w-5' alt="link_icon" />
                    <input type="url" className="url_input peer" value={article.url} placeholder="Enter a URL" onChange={(e) => setArticle({ ...article, url: e.target.value })} required />
                    <button type="submit" className="submit_btn">
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </form>
                {/* Browse URL history */}
                <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                    {allArticles.map((article, index) => (
                        <div key={`link-${index}`}
                            onClick={() => setArticle(article)}
                            className="link_card">
                            <div className="copy_btn" onClick={() => copyToClipboard(article.url)}>
                                <img 
                                    src={copied === article.url ? tick : copy} 
                                    alt="copy-icon" 
                                    className="w-[40%] h-[40%] object-contain" 
                                />
                            </div>
                            <p className="flex-1 font-satoshi text-blue-700 font-medium text-small truncate">
                                {article.url}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            {/* display results */}
            <div className="flex justify-center max-w-full items-center my-10">
                {isFetching ? (
                    <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
                ) : error ? (
                    <p className="text-red-500 font-inter font-bold text-center">
                        Something went wrong
                        <br />
                        <span className='font-satoshi font-normal text-gray-700'>
                            {error?.data?.error}
                        </span>
                    </p>
                ) : article.summary ? (
                    <div className="flex flex-col gap-3">
                        <h2 className="font-satoshi font-bold text-gray-600 text-xl flex flex-row gap-2">
                            Article <span className='blue_gradient flex flex-row gap-2 w-full'>Summary
                                <img 
                                    src={copied === article.summary ? tick : copy} 
                                    alt="copy-icon" 
                                    className="w-6 h-6 object-contain cursor-pointer ml-auto"
                                    onClick={() => copyToClipboard(article.summary)} 
                                />
                            </span>
                        </h2>
                        <div className="summary_box">
                            <p className="font-inter font-medium text-sm text-gray-700">
                                {article.summary}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-500 font-satoshi font-normal text-center">
                        Enter a URL to get started
                    </p>
                )}
            </div>
        </section>
    )
}

export default Demo